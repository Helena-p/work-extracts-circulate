import {
	useState,
	useEffect,
	useContext,
	useReducer,
	useCallback,
} from 'react';
import {
	getAddressList,
	createAddress,
	deleteAddress,
	updateAddress,
	updateAccount,
} from '../../backend/backend';
import { CirculateContext } from '../../components/context/CirculateContextWrapper';

const INITIAL_STATE = {
	description: '',
	first_name: '',
	last_name: '',
	address1: '',
	address2: '',
	city: '',
	state: '',
	zip: '',
	country: 'SE',
	note: '',
	billing: false,
	shipping: false,
	isValid: false,
};

const ACTIONS = {
	INITIALIZE_FORM: 'init',
	NEW: 'new',
	EDIT: 'edit',
	CLEAR: 'clear',
};

// TODO: integrate & add validation for company details form as well
const addressReducer = (state, action) => {
	let errors = [];
	switch (action.type) {
		case ACTIONS.NEW: {
			if (action.required) {
				action.payload.trim() === '' ? errors.push(action.field) : null;
			}
			let valid = errors.length === 0;
			return {
				...state,
				[action.field]: action.payload,
				errors: errors,
				isValid: valid,
			};
		}
		case ACTIONS.EDIT: {
			if (action.required) {
				action.payload.trim() === '' ? errors.push(action.field) : null;
			}
			let valid = errors.length > 0 ? false : true;
			return {
				...state,
				[action.field]: action.payload,
				isValid: valid,
				errors,
			};
		}
		case ACTIONS.CLEAR: {
			return {
				...INITIAL_STATE,
				isValid: false,
			};
		}
		case ACTIONS.INITIALIZE_FORM: {
			return action.payload;
		}
		default:
			return state;
	}
};

export const useAddressControls = (
	addressId,
	formType,
	setCurrentAddressView
) => {
	const [savedAddresses, setSavedAddresses] = useState([]);
	const [defaultAddresses, setDefaultAddresses] = useState([]);
	const { account, refreshAccount, isLoggedIn, setIsLoading } =
		useContext(CirculateContext);

	// find address to update by id
	let editAddress = savedAddresses.find(
		(address) => address.id === addressId
	);

	// is the edit address also default address?
	let shipping = account?.shipping?.account_address_id == addressId;
	let billing = account?.billing?.account_address_id == addressId;

	// set initial state for editAdress to pre-populate form
	useEffect(() => {
		formType === 'edit'
			? dispatchAddress({
					type: 'init',
					payload: { ...editAddress, shipping, billing },
			  })
			: dispatchAddress({ type: 'init', payload: { ...INITIAL_STATE } });
	}, [formType, editAddress, shipping, billing]);

	const [addressState, dispatchAddress] = useReducer(
		addressReducer,
		INITIAL_STATE
	);

	let loadAddresses = useCallback(async () => {
		if (isLoggedIn()) {
			try {
				let addresses = await getAddressList();
				if (addresses?.results) {
					setSavedAddresses(addresses.results);
				}
			} catch (error) {
				console.error(error);
				setSavedAddresses([]);
			}
		}
	}, [isLoggedIn]);

	// Load previously saved addresses to choose from
	useEffect(() => {
		loadAddresses();
		// eslint-disable-next-line
	}, [account, isLoggedIn]);

	// join billing and shipping into one string
	let keys = Object.keys(addressState);
	let filtered = keys.filter((key) => {
		return addressState[key];
	});
	let typeArray = filtered.filter((key) => {
		return key === 'billing' || key === 'shipping';
	});
	let type = typeArray.toString();

	const createNewAddress = async () => {
		setIsLoading(true);
		if (!addressState.isValid) return;
		try {
			let result = await createAddress({
				description: addressState.description || addressState.address1,
				first_name: addressState.first_name,
				last_name: addressState.last_name,
				address1: addressState.address1,
				address2: addressState.address2,
				city: addressState.city,
				state: addressState.state,
				zip: addressState.zip,
				country: addressState.country,
				note: addressState.note,
				type: type,
			});

			let accountUpdate = {};

			if (addressState.billing) {
				accountUpdate.billing = {
					account_address_id: result.id,
					first_name: addressState.first_name,
					last_name: addressState.last_name,
					address1: addressState.address1,
					address2: addressState.address2,
					city: addressState.city,
					state: addressState.state,
					zip: addressState.zip,
					country: addressState.country,
				};
			}

			if (addressState.shipping) {
				accountUpdate.shipping = {
					account_address_id: result.id,
					first_name: addressState.first_name,
					last_name: addressState.last_name,
					address1: addressState.address1,
					address2: addressState.address2,
					city: addressState.city,
					state: addressState.state,
					zip: addressState.zip,
					country: addressState.country,
				};
			}
			if (accountUpdate.billing || accountUpdate.shipping) {
				await updateAccount(accountUpdate);
			}

			await loadAddresses();
			await refreshAccount();
		} catch (error) {
			console.warn(error.message);
		} finally {
			setIsLoading(false);
			dispatchAddress({ type: 'clear', payload: { ...INITIAL_STATE } });
			setCurrentAddressView('saved');
		}
	};

	const updateAddressData = async () => {
		setIsLoading(true);
		if (!addressState.isValid) return;
		try {
			let result = await updateAddress({
				description: addressState.description || addressState.address1,
				id: addressId,
				first_name: addressState.first_name,
				last_name: addressState.last_name,
				address1: addressState.address1,
				address2: addressState.address2,
				city: addressState.city,
				state: addressState.state,
				zip: addressState.zip,
				country: addressState.country,
				note: addressState.note,
				type: type,
			});

			let accountUpdate = {};

			if (addressState.billing != billing) {
				if (addressState.billing) {
					accountUpdate.billing = {
						account_address_id: addressId,
						first_name: addressState.first_name,
						last_name: addressState.last_name,
						address1: addressState.address1,
						address2: addressState.address2,
						city: addressState.city,
						state: addressState.state,
						zip: addressState.zip,
						country: addressState.country,
					};
				} else {
					accountUpdate.billing = {
						account_address_id: '',
						first_name: '',
						last_name: '',
						address1: '',
						address2: '',
						city: '',
						state: '',
						zip: '',
						country: '',
					};
				}
			}

			if (addressState.shipping != shipping) {
				if (addressState.shipping) {
					accountUpdate.shipping = {
						account_address_id: addressId,
						first_name: addressState.first_name,
						last_name: addressState.last_name,
						address1: addressState.address1,
						address2: addressState.address2,
						city: addressState.city,
						state: addressState.state,
						zip: addressState.zip,
						country: addressState.country,
					};
				} else {
					accountUpdate.shipping = {
						account_address_id: '',
						first_name: '',
						last_name: '',
						address1: '',
						address2: '',
						city: '',
						state: '',
						zip: '',
						country: '',
					};
				}
			}
			if (accountUpdate.billing || accountUpdate.shipping) {
				await updateAccount(accountUpdate);
			}

			await loadAddresses();
			await refreshAccount();
		} catch (error) {
			console.warn(error.message);
		} finally {
			setIsLoading(false);
			setCurrentAddressView('saved');
		}
	};

	const removeAddress = async (id) => {
		setIsLoading(true);
		try {
			await deleteAddress(id);
			await loadAddresses();
			await refreshAccount();
		} catch (error) {
			console.warn(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const clearForm = (e) => {
		dispatchAddress({ type: 'clear' });
	};

	const handleInputValue = (e) => {
		dispatchAddress({
			type: formType,
			field: e.target.name,
			payload:
				e.target.type === 'checkbox'
					? e.target.checked
					: e.target.value,
			required: e.target.required,
		});
	};

	return {
		addressState,
		handleInputValue,
		savedAddresses,
		defaultAddresses,
		editAddress,
		clearForm,
		createNewAddress,
		updateAddressData,
		removeAddress,
	};
};
