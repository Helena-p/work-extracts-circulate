import { useState } from 'react';
import { Stack, Paper } from '@mui/material';
import AddressCard from '../address/AddressCard';
import AddressInfoHeader from './AddressInfoHeader';
import AddressForm from './AddressForm';
import { useAddressControls } from '../../../functions/account/addressControls';

export default function AddressInfoTab({ styles }) {
	const [addressId, setAddressId] = useState('');
	// toggle view in state for saved, new or edit
	const [currentAddressView, setCurrentAddressView] = useState('saved');
	const {
		savedAddresses,
		clearForm,
		addressState,
		handleInputValue,
		createNewAddress,
		updateAddressData,
		removeAddress,
	} = useAddressControls(
		addressId,
		currentAddressView,
		setCurrentAddressView
	);

	return (
		<>
			<Paper elevation={1} sx={{ p: 3 }}>
				<AddressInfoHeader
					currentView={currentAddressView}
					onClick={(e) => setCurrentAddressView('new')}
					onGoBack={(e) => setCurrentAddressView('saved')}
				/>
				{currentAddressView === 'edit' && (
					<AddressForm
						savedAddresses={savedAddresses}
						addressId={addressId}
						setAddressId={setAddressId}
						addressState={addressState}
						handleInputValue={handleInputValue}
						onSubmit={(e) => {
							updateAddressData();
							e.preventDefault();
						}}
						onClear={clearForm}
					/>
				)}
				{currentAddressView === 'new' && (
					<AddressForm
						addressState={addressState}
						handleInputValue={handleInputValue}
						onSubmit={(e) => {
							createNewAddress();
							e.preventDefault();
						}}
						onClear={clearForm}
					/>
				)}
				{currentAddressView === 'saved' && (
					<Stack
						direction="row"
						flexWrap="wrap"
						alignItems="stretch"
						sx={{ gap: 3, mt: 4 }}>
						{savedAddresses.map((address) => (
							<AddressCard
								key={address.id}
								address={address}
								onEdit={(e) => {
									setAddressId(address.id);
									setCurrentAddressView('edit');
								}}
								onDelete={(e) => removeAddress(address.id)}
							/>
						))}
					</Stack>
				)}
			</Paper>
		</>
	);
}
