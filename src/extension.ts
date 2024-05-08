import * as vscode from 'vscode';
import { showOpenTabs } from './commands';
import { DataManager } from './dataManager';

export function activate(context: vscode.ExtensionContext) {

	new DataManager(context);
	context.subscriptions.push(
		vscode.commands.registerCommand('reopen-it.showOpenTabs', showOpenTabs()),
	);
}

export function deactivate() {}