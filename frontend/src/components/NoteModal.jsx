import React, {useState} from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { DialogActions, DialogContent, IconButton } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export default function NoteModal() {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {setOpen(true);}
    const handleClose = () => {setOpen(false);}

    return (
        <div>
            <button onClick={handleOpen}>
                <MoreVertIcon/>
            </button>
            <BootstrapDialog
                onClose={handleClose}
                open={open}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                </IconButton>
                <DialogContent>
                    <h3>Edit Note</h3>
                </DialogContent>
            </BootstrapDialog>
        </div>
    )
}