import * as vscode from 'vscode';
import { DataManager, Workspace } from './dataManager';
import { Favourite, FavouritesProvider } from './favouritesProvider';
import { WorkspacesProvider } from './workspacesProvider';
import { ConfigsManager } from './configsManager';

export type CommandCallback = (...args: any[]) => any;

/*
	Temp. removed from package.json
	"menus": {
		"editor/context": [
			{
				"command": "reopen-it.addFavourite",
				"title": "Add to favourites"
			},
			{
				"command": "reopen-it.removeFavourite",
				"title": "Remove from favourites"
			}
		],
		"view/title": [
			{
				"command": "reopen-it.refreshEntry",
				"when": "view == reopen-it",
				"group": "navigation"
			}
		],
		"view/item/context": [
			{
				"command": "reopen-it.copyPath",
				"title": "Copy file path",
				"when": "view == reopenIt-favourites"
			}
		]
	}
*/

/*
	Actual commands:
		- Add/remove favourite
		- Save workspace 
		- Save workspace as -> _workspaceName_
		- Save and close workspace
		- Open workspace -> _workspaceName_
	Menu commands:
		- Remove favourite
		- Open workspace
		- Rename workspace
		- Delete workspace
		- Remove file from workspace
		- Pin/unpin file in workspace (maybe)
*/

export class CommandManager {
	static dataManager: DataManager;

//#region Tree
	static favouritesProvider: FavouritesProvider;
	static workspacesProvider: WorkspacesProvider;
	static refreshTree: CommandCallback = () => {
		this.favouritesProvider.refresh();
		this.workspacesProvider.refresh();
	};
//#endregion Tree

//#region Favourites
	//? Favourite's icon is an HEART, not a star
	/**
	 * Called from: "editor/title/context"
	 * @param item 
	 */
	static addFavourite: CommandCallback = (item: any) => {
		this.dataManager.addFavourite(item.path);
		this.refreshTree();
	};
	
	/**
	 * Called from: "editor/title/context", "view/item/context"
	 * @param item 
	 */
	static removeFavourite: CommandCallback = (item: Favourite) => {
		this.dataManager.removeFavourite(item.filePath);
		this.refreshTree();
	};

	/**
	 * Called from: "view/item/context"
	 * @param item 
	 */
	static openFavourite: CommandCallback = (item: Favourite) => {
		item.exists? vscode.window.showTextDocument(vscode.Uri.file(item.filePath), {preview: ConfigsManager.openFavouriteInPreview}) : null;
	};
//#endregion Favourites

//#region Workspaces
	static saveWorkspace: CommandCallback = (workspaceName: string = "") => {
		const titledDocs = vscode.workspace.textDocuments.filter(doc => !doc.isUntitled);
		if (workspaceName === "") {
			workspaceName = "workspace1"; //WIP, will be incremental
		}
		this.dataManager.workspaces.push({
			name: workspaceName,
			tabs: titledDocs.map(doc => ({
				path: doc.fileName,
				pinned: true //TODO how to get this data
			})),
			folder: "folder" //TODO how to get this data
		});
	};
	
	static saveWorkspaceAs: CommandCallback = () => {
		vscode.window.showInputBox( { prompt: "Workspace name"} ).then( workspaceName => this.saveWorkspace(workspaceName));
	};

	static saveCloseWorkspace: CommandCallback = () => {
		this.saveWorkspace();
		vscode.commands.executeCommand("workbench.action.closeAllEditors"); //TODO check if this works
	};

	static openWorkspace: CommandCallback = (workspaceName: string = "") => { //TODO check if this works
		if (this.dataManager.workspacesNames.length === 0) {
			vscode.window.showErrorMessage("No workspaces saved");
		}
		const openWorkspaceCB = (workspaceName: string) => {
			const workspace = this.dataManager.workspaces.find(w => w.name === workspaceName);
			if (workspace) {
				workspace.tabs.forEach(tab => {
					vscode.workspace.openTextDocument(tab.path).then(doc => vscode.window.showTextDocument(doc));
				});
			}
			else {
				vscode.window.showErrorMessage(`Workspace ${workspaceName} not found`);
			}
		};
		if (workspaceName === "") {
			const options: vscode.QuickPickOptions = { matchOnDetail: true, matchOnDescription: true, canPickMany: false, placeHolder: "Select tags to remove" };
			vscode.window.showQuickPick(this.dataManager.workspaces.map(w => w.name), options).then(workspaceName => openWorkspaceCB(workspaceName || ""));
		}
		else {
			openWorkspaceCB(workspaceName);
		}
	};
	//#endregion Workspaces
}