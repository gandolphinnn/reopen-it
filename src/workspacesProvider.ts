import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { DataManager } from './dataManager';

export class WorkspacesProvider implements vscode.TreeDataProvider<Workspace> {
	constructor(private dataManager: DataManager) {}

	getTreeItem(element: Workspace): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Workspace): Thenable<Workspace[]> {

		if (element === undefined) {
			return Promise.resolve([new Workspace("Favourites", vscode.TreeItemCollapsibleState.Expanded)]);
		}

		const favorites = this.dataManager.favorites;

		return Promise.resolve(
			favorites.map(favorite => {
				return new Workspace(favorite, vscode.TreeItemCollapsibleState.None);
			})
		);
	}
}

class Workspace extends vscode.TreeItem {
	name: string;

	get exists() {
		return fs.existsSync(this.filePath);
	}

	constructor(
		public readonly filePath: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState
	) {
		const name = path.basename(filePath);
		
		super(name, collapsibleState);
		this.name = name;
		this.tooltip = filePath;
	}

	/* iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'light', 'icon.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'icon.svg')
	}; */
}