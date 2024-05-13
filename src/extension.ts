import * as vscode from 'vscode';
import { CommandManager } from './commands';
import { DataManager } from './dataManager';
import { ReopenItProvider } from './provider';

export function activate(context: vscode.ExtensionContext) {

	CommandManager.dataManager = new DataManager(context);

	const reopenItProvider = new ReopenItProvider(CommandManager.dataManager);

	vscode.window.registerTreeDataProvider('reopenIt', reopenItProvider);

	//TODO fix the "auto-launch commands" bug
	context.subscriptions.push(
		vscode.commands.registerCommand('reopen-it.showOpenTabs', CommandManager.showOpenTabs()),
		vscode.commands.registerCommand('reopen-it.addFavourite', CommandManager.addFavourite()),
		vscode.commands.registerCommand('reopen-it.removeFavourite', CommandManager.removeFavourite()),
		//vscode.commands.registerCommand('reopen-it.openFavourite', reopenItProvider.removeFavourite()),
	);
}

export function deactivate() {}