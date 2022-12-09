import {SelectOption} from "./FindSelectOptions";
import {LitElement} from "@lion/core";

/**
 * EGroupware eTemplate2 - SelectAccountMixin
 *
 * @license http://opensource.org/licenses/gpl-license.php GPL - GNU General Public License
 * @package api
 * @link https://www.egroupware.org
 * @author Nathan Gray
 */

/**
 * Common code for editable & read-only select account
 * Moved out so we don't have copy+paste code in both
 */
export declare class SelectAccountInterface
{
	set value(new_value : string | string[])

	get value() : string | string[]

	set select_options(new_options : SelectOption[])
	get select_options() : SelectOption[]
}

type Constructor<T = {}> = new (...args : any[]) => T;
export const SelectAccountMixin = <T extends Constructor<LitElement>>(superclass : T) =>
{
	class SelectAccount extends superclass
	{

		/**
		 * Hold on to accounts we had to fetch from the server
		 * @type {any[]}
		 * @protected
		 */
		protected account_options = [];

		/**
		 * If the value has an account that's not already in the list, check with the server.
		 * We probably don't have all the accounts client side.  This is similar to freeEntries,
		 * but a little safer because we don't allow just anything.
		 *
		 * @param {any} new_value
		 */
		set value(new_value : string | string[])
		{
			super.value = new_value;
			if(!new_value)
			{
				return;
			}
			let val = Array.isArray(this.value) ? this.value : [this.value];
			for(let id of val)
			{
				let account_name = null;
				let option = <SelectOption>{value: id, label: id + " ..."};
				this.account_options.push(option);
				if(new_value && (account_name = this.egw().link_title('api-accounts', id, false)))
				{
					option.label = account_name;
				}
				else if(!account_name)
				{
					// Not already cached, need to fetch it
					this.egw().link_title('api-accounts', id, true).then(title =>
					{
						option.label = title;
						this.requestUpdate();
					});
				}
			}
		}

		get value()
		{
			return super.value;
		}

		get select_options()
		{
			return [...this.account_options, ...super.select_options];
		}

		set select_options(value : SelectOption[])
		{
			super.select_options = value;
		}
	}

	return SelectAccount as unknown as Constructor<SelectAccountInterface> & T;
}