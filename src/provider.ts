import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { DataManager } from './dataManager';

export class ReopenItProvider implements vscode.TreeDataProvider<ReopenIt> {
	constructor(private dataManager: DataManager) {}

	getTreeItem(element: ReopenIt): vscode.TreeItem {
		return element;
	}

	getChildren(element?: ReopenIt): Thenable<ReopenIt[]> {

		if (element === undefined) {
			return Promise.resolve([new ReopenIt("Favourites", vscode.TreeItemCollapsibleState.Expanded)]);
		}

		const favorites = this.dataManager.favorites;

		return Promise.resolve(
			favorites.map(favorite => {
				return new ReopenIt(favorite, vscode.TreeItemCollapsibleState.None);
			})
		);
	}
}

class ReopenIt extends vscode.TreeItem {
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