<script lang="ts">
	import { goto } from "$app/navigation";
    import { Camera, CameraResultType } from "@capacitor/camera";
    import { decode } from "base64-arraybuffer";
    import toast from "svelte-french-toast";
    import { currentTitle } from "$lib/stores/currentPage";
    import { jwtToken, userID } from "$lib/stores/jwt";
    $currentTitle = "Scan";
    let currImage: string = "",
        buttonDisabled: boolean = false;
    
    const convertToBlob = () => {
        const blob = new Blob( [ new Uint8Array( decode( currImage ) ) ], {
            type: `image/jpg`
        } );

        return blob;
    }

    const uploadPhoto = async () => {
        const image = await Camera.getPhoto( { 
            quality: 100,
            allowEditing: true,
            resultType: CameraResultType.Base64
        } );
        
        if (image.base64String) {
            currImage = image.base64String;
            scanPhoto();
        }
    }

    const scanPhoto = async () => {
        const formData: FormData = new FormData();
        formData.append("uploadedImage", convertToBlob());

        buttonDisabled = true;

        const req = await fetch("http://localhost:8080/api/v1/books/extract", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": $jwtToken
            },
            body: formData
        });
        const res = await req.json();

        if (req.status === 200) {
            toast.success("ISBN code successfully extracted", { position: "bottom-center" });
            goto(`/search?query=${res["data"]}`);
        } else {
            toast.error(res["message"], { position: "bottom-center" });
        }

        buttonDisabled = false;
    }
</script>

<div class="flex-grow px-4 py-20">
    <button class="block w-screen max-w-[20rem] h-screen max-h-[20rem] bg-white rounded mx-auto mt-16" on:click={uploadPhoto} disabled={buttonDisabled}>
        <img 
        src="{ currImage ? `data:image/png;base64, ${currImage}`: ""}" 
        alt="">
    </button>
    <p class="text-center w-full max-w-sm mt-8 text-lg text-gray-400">If an ISBN10/13 is present within the image, it will be automatically detected after uploading an image.</p>
</div>