import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { DataManager } from './dataManager';

export class FavouritesProvider implements vscode.TreeDataProvider<Favourite> {
	private _onDidChangeTreeData = new vscode.EventEmitter<Favourite | undefined | null | void>();
	readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

	constructor(private dataManager: DataManager) {}
	
	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: Favourite): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Favourite): Thenable<Favourite[]> {

		/* if (element === undefined) {
			return Promise.resolve([new Favourite(false, "Favourites", vscode.TreeItemCollapsibleState.Expanded)]);
		} */

		const favorites = this.dataManager.favorites;

		return Promise.resolve(
			favorites.map(favorite => {
				return new Favourite(true, favorite, vscode.TreeItemCollapsibleState.None);
			})
		);
	}
}

class Favourite extends vscode.TreeItem {
	name: string;
	

	get exists() {
		return fs.existsSync(this.filePath);
	}
	get iconConditionalPath() {
		//TODO optimize this part with 2 const paths to choose
		return this.displayIcon? path.join(__filename, '..', '..', 'resources', this.exists? 'file_exists.svg' : 'file_missing.svg') : '';
	}

	constructor (
		public readonly displayIcon: boolean,
		public readonly filePath: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState
	) {
		const name = path.basename(filePath);
		
		super(name, collapsibleState);
		this.name = name;
		this.tooltip = filePath;
		this.iconPath = this.iconConditionalPath;
	}
}