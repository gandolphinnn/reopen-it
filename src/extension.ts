import * as vscode from 'vscode';
import * as path from 'path';
import { CommandManager } from './commands';
import { DataManager } from './dataManager';
import { FavouritesProvider } from './favouritesProvider';
import { WorkspacesProvider } from './workspacesProvider';

export function activate(context: vscode.ExtensionContext) {

	//const dataPath = path.join(context.globalStorageUri.fsPath);
	const dataPath = path.join(__filename, '..', '..');

	CommandManager.dataManager = new DataManager(dataPath);

	const favouritesProvider = new FavouritesProvider(CommandManager.dataManager);
	const workspacesProvider = new WorkspacesProvider(CommandManager.dataManager);

	vscode.window.registerTreeDataProvider('reopenIt-favourites', favouritesProvider);
	vscode.window.registerTreeDataProvider('reopenIt-workspaces', workspacesProvider);

	//TODO fix the "auto-launch commands" bug
	context.subscriptions.push(
		vscode.commands.registerCommand('reopen-it.toggleFavourite', CommandManager.toggleFavourite()),
		//vscode.commands.registerCommand('reopen-it.addFavourite', CommandManager.addFavourite()),
		//vscode.commands.registerCommand('reopen-it.removeFavourite', CommandManager.removeFavourite()),
		vscode.commands.registerCommand('reopen-it.saveWorkspace', CommandManager.saveWorkspace()),
		vscode.commands.registerCommand('reopen-it.saveWorkspaceAs', CommandManager.saveWorkspaceAs()),
		vscode.commands.registerCommand('reopen-it.saveCloseWorkspace', CommandManager.saveCloseWorkspace()),
		vscode.commands.registerCommand('reopen-it.openWorkspace', CommandManager.openWorkspace()),
	);
}

export function deactivate() {}