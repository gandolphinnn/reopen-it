import * as vscode from 'vscode';
import * as path from 'path';
import { CommandManager } from './commands';
import { DataManager } from './dataManager';
import { FavouritesProvider } from './favouritesProvider';
import { WorkspacesProvider } from './workspacesProvider';
import { ConfigsManager } from './configsManager';

export function activate(context: vscode.ExtensionContext) {

	//const dataPath = path.join(context.globalStorageUri.fsPath);
	const dataPath = path.join(__filename, '..', '..');
	ConfigsManager.load();

	const dataManager = new DataManager(dataPath);
	const favouritesProvider = new FavouritesProvider(dataManager);
	const workspacesProvider = new WorkspacesProvider(dataManager);

	CommandManager.dataManager = dataManager;
	CommandManager.favouritesProvider = favouritesProvider;
	CommandManager.workspacesProvider = workspacesProvider;

//#region Configurations
	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(e => ConfigsManager.refresh(e))
	);
//#endregion Configurations

//#region Tree
	vscode.window.registerTreeDataProvider('reopenIt-favourites', favouritesProvider);
	vscode.window.registerTreeDataProvider('reopenIt-workspaces', workspacesProvider);

	context.subscriptions.push(
		vscode.commands.registerCommand('reopen-it.refreshTree',		CommandManager.refreshTree),
	);
//#endregion Tree
	
//#region Favourites
	context.subscriptions.push(
		vscode.commands.registerCommand('reopen-it.addFavourite',		CommandManager.addFavourite),
		vscode.commands.registerCommand('reopen-it.removeFavourite',	CommandManager.removeFavourite),
		vscode.commands.registerCommand('reopen-it.openFavourite',		CommandManager.openFavourite),
	);
//#endregion Favourites
	
//#region Workspaces
	context.subscriptions.push(
		vscode.commands.registerCommand('reopen-it.saveWorkspace',		CommandManager.saveWorkspace),
		vscode.commands.registerCommand('reopen-it.saveWorkspaceAs',	CommandManager.saveWorkspaceAs),
		vscode.commands.registerCommand('reopen-it.saveCloseWorkspace',	CommandManager.saveCloseWorkspace),
		vscode.commands.registerCommand('reopen-it.openWorkspace',		CommandManager.openWorkspace),
	);
//#endregion Workspaces
}

export function deactivate() {}