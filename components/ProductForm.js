import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react"


export default function ProductForm({
	_id,
	title:existingTitle,
	description:existingDescription,
	price:existingPrice,
	images,
}) {
	const [title, setTitle] = useState(existingTitle || '');
	const [description, setDescription] = useState(existingDescription || '');
	const [price, setPrice] = useState(existingPrice || '');
	const [goToProducts, setGoToProducts] = useState(false);
	const router = useRouter();
	async function saveProduct(ev) {
		ev.preventDefault();
		const data = {title,description,price};
		if (_id) {
			//update
			await axios.put('/api/products', {...data,_id});
		} else {
			//create
			await axios.post('/api/products', data);
		}
		setGoToProducts(true);
	}
	if (goToProducts) {
		 router.push('/products');
	}

	async function uploadImages(ev) {
		const files = ev.target?.files;
		if (files.length > 0) {
			const data = new FormData();
			for (const file of files) {
				data.append('file', file)
			}
			const res =  await fetch('/api/upload', {
				method: 'POST',
				body: data,
			})
			console.log(res);
		}
	}
	return (
			<form onSubmit={saveProduct}>
				<label>Product name</label>
				<input 
					type="text" 
					placeholder="product name"
					value={title} 
					onChange={ev => setTitle(ev.target.value)}>
				</input>
				<label>
					Photos
				</label>
				<div className="mb-2">
					<label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				  	<path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
					</svg>
					<div>
						Upload
					</div>
					<input type="file" onChange={uploadImages} className="hidden"></input>
					</label>
					{!images?.length && (
						<div>No photos in this product</div>
					)}
				</div>
				<label>Description</label>
				<textarea 
					placeholder="description"
					value={description}
					onChange={ev => setDescription(ev.target.value)}>
				</textarea>
				<label>Price (in USD)</label>
				<input 
					type="number" 
					placeholder="price"
					value={price}
					onChange={ev => setPrice(ev.target.value)}>
				</input>
				<button 
				type="submit"
				className="btn-primary">Save</button>
			</form>

	);
}