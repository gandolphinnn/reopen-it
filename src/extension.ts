import * as vscode from 'vscode';
import { CommandManager } from './commands';
import { DataManager } from './dataManager';
import { FavouritesProvider } from './favouritesProvider';
import { WorkspacesProvider } from './workspacesProvider';

export function activate(context: vscode.ExtensionContext) {

	CommandManager.dataManager = new DataManager(context);

	const favouritesProvider = new FavouritesProvider(CommandManager.dataManager);
	const workspacesProvider = new WorkspacesProvider(CommandManager.dataManager);

	vscode.window.registerTreeDataProvider('reopenIt-favourites', favouritesProvider);
	vscode.window.registerTreeDataProvider('reopenIt-workspaces', workspacesProvider);

	//TODO fix the "auto-launch commands" bug
	context.subscriptions.push(
		//vscode.commands.registerCommand('reopen-it.showOpenTabs', CommandManager.showOpenTabs()),
		//vscode.commands.registerCommand('reopen-it.addFavourite', CommandManager.addFavourite()),
		//vscode.commands.registerCommand('reopen-it.removeFavourite', CommandManager.removeFavourite()),
		//vscode.commands.registerCommand('reopen-it.openFavourite', reopenItProvider.removeFavourite()),
		vscode.commands.registerCommand('reopen-it.copyPath', () => {}),
	);
}

export function deactivate() {}