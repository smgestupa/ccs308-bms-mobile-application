<script lang="ts">
	import { goto } from '$app/navigation';
	import { Camera, CameraResultType } from '@capacitor/camera';
	import { decode } from 'base64-arraybuffer';
	import toast from 'svelte-french-toast';
	import { currentTitle } from '$lib/stores/currentPage';
	import { jwtToken, userID } from '$lib/stores/jwt';
	import bms_icon_inverted from '$lib/assets/bms-icon-inverted.png';
	$currentTitle = 'Scan';
	let currImage: string = '',
		buttonDisabled: boolean = false;

	const convertToBlob = () => {
		const blob = new Blob([new Uint8Array(decode(currImage))], {
			type: `image/jpg`
		});

		return blob;
	};

	const uploadPhoto = async () => {
		const image = await Camera.getPhoto({
			quality: 100,
			allowEditing: true,
			resultType: CameraResultType.Base64
		});

		currImage = image.base64String ?? '';
		if (currImage) scanPhoto();
	};

	const scanPhoto = async () => {
		const formData: FormData = new FormData();
		formData.append('uploadedImage', convertToBlob());

		buttonDisabled = true;

		try {
			const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/books/extract`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: $jwtToken
				},
				body: formData
			});
			const res = await req.json();

			if (req.status === 200) {
				toast.success('ISBN code successfully extracted', { position: 'bottom-center' });
				goto(`/search?query=${res['data']}`);
			} else {
				toast.error(res['message'], { position: 'bottom-center' });
			}
		} catch (err) {
			toast.error('Something went wrong during scanning, try again later', {
				position: 'bottom-center'
			});
			currImage = '';
		}

		buttonDisabled = false;
	};
</script>

<div class="flex-grow px-4 py-20">
	<button
		class="mx-auto mt-16 block h-screen max-h-[20rem] w-screen max-w-[20rem] overflow-hidden rounded bg-white"
		on:click={uploadPhoto}
		disabled={buttonDisabled}
	>
		<img src={currImage ? `data:image/png;base64, ${currImage}` : bms_icon_inverted} alt="" />
	</button>
	<p class="mt-8 w-full max-w-sm text-center text-lg text-gray-400">
		If an ISBN10/13 is present within the image, it will be automatically detected after uploading
		an image.
	</p>
</div>
