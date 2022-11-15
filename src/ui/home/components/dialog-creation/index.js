import {useState} from "react";
import {useDropzone} from 'react-dropzone';

import {appObserver} from "../../../../core/state-management/utils";

import s from './styles.module.scss';
import {cn} from "../../../../core/utils/classNames";

import {ConfirmationDialog} from "../../../../shared/components/dialog-confirmation";
import {TextareaAutosize, TextField} from "@mui/material";

const MAX_FILES = 1;
const ACCEPT = 'image/jpeg, image/png';
const MAX_SIZE = 10485760;
const MAX_SIZE_WORDS = "10 MB";

export const CreationDialog = appObserver(({isOpen, onClose, onSubmit}) => {
    const [image,setImage] = useState(null);
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const buttons = [
        { label: 'Close', onClick: onClose, variant: 'text', color: 'primary' },
        { label: 'Apply', onClick: () => onSubmit(image.file, title, price, description)},
    ];
    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: ACCEPT,
        maxFiles: MAX_FILES,
        maxSize: MAX_SIZE,
        onDropAccepted: handleDrop
    });

    function handleDrop (acceptedFiles) {
        if (!acceptedFiles.length) return;
        const f = acceptedFiles[0];
        setImage({
            preview: URL.createObjectURL(f),
            file: f
        });
    }

    return (
        <ConfirmationDialog
            title={'Create new NFT'}
            isOpen={isOpen}
            onClose={onClose}
            buttons={buttons}
        >
            <div className={s.root}>
                <div
                    {...getRootProps()}
                    className={cn(s.dropzone,{ [s.active]: isDragActive})}
                    style={ image ? { backgroundImage: `url(${image.preview})` } : null }
                >
                    <input {...getInputProps()} />
                    <div className={s.icons}>
                        Drop your artwork here
                        <span>*up to {MAX_SIZE_WORDS}</span>
                    </div>
                </div>
                <div className={s.fields}>
                    <TextField className={s.field} type="text" step="0.01" min="0.01" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <TextField className={s.field} type="number" step="0.01" min="0.01" placeholder="Price (Eth)" value={price} onChange={e => setPrice(e.target.value)} />
                    <TextField multiline minRows={2} className={s.field} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
            </div>
        </ConfirmationDialog>
    );
});