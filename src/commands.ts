import * as vscode from 'vscode';
import { DataManager, Workspace } from './dataManager';

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
				"command": "nodeDependencies.refreshEntry",
				"when": "view == nodeDependencies",
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

	static addFavourite: CommandCallback = (docPath = vscode.window.activeTextEditor!.document.fileName) => {
		vscode.window.showInformationMessage(`Add ${docPath} to favourites`);
		this.dataManager.addFavourite(docPath);
	};

	static removeFavourite: CommandCallback = (docPath = vscode.window.activeTextEditor!.document.fileName) => {
		vscode.window.showInformationMessage(`Remove ${docPath} from favourites`);
		this.dataManager.removeFavourite(docPath);
	};
	
	static toggleFavourite: CommandCallback = (docPath = vscode.window.activeTextEditor!.document.fileName) => {
		this.dataManager.addFavourite(docPath) && vscode.window.showInformationMessage(`Add ${docPath} to favourites`)
		||
		this.dataManager.removeFavourite(docPath) && vscode.window.showInformationMessage(`Remove ${docPath} from favourites`);
	};
	//
	static saveWorkspace: CommandCallback = () => {
		const titledDocs = vscode.workspace.textDocuments.filter(doc => !doc.isUntitled);
		this.dataManager.workspaces.push({
			name: "workspace1", //WIP
			tabs: titledDocs.map(doc => ({
				path: doc.fileName,
				pinned: true //TODO how to get this data
			})),
			folder: "folder" //TODO how to get this data
		});
	};
	static saveWorkspaceAs: CommandCallback = () => {
		//TODO
	}
	static saveCloseWorkspace: CommandCallback = () => {
		//TODO
	}
	static openWorkspace: CommandCallback = () => {
		//TODO
	}
}