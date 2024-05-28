/* eslint-disable curly */
import * as vscode from 'vscode';

export class ConfigsManager {


//#region Properties
	private static _openFavouriteInPreview = true;
	static get openFavouriteInPreview() { return this._openFavouriteInPreview; }
//#endregion Properties

//#region Methods
	static load() {
		const config = vscode.workspace.getConfiguration('reopen-it');
		this._openFavouriteInPreview = this.getValue<boolean>(config, 'openFavouriteInPreview');
	}

	private static getValue<T>(config: vscode.WorkspaceConfiguration, key: string) {
		const section = config.inspect<T>(key);
		return section?.workspaceValue ?? section?.globalValue ?? section?.defaultValue!;
	}

	//TODO
	static refresh(e: vscode.ConfigurationChangeEvent) {
		if (!e.affectsConfiguration('reopenIt'))
			return;
	}
//#endregion Methods
}