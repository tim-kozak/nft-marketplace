import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import s from './styles.module.scss';

export const ConfirmationDialog = ({
                                                                            isOpen,
                                                                            classes,
                                                                            onClose,
                                                                            buttons,
                                                                            title,
                                                                            content,
                                                                            children,
                                                                        }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} scroll="paper" maxWidth="md" className={s.root}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent className={s.content}>
                {content && <DialogContentText className={s.text}>{content}</DialogContentText>}
                {children}
            </DialogContent>
            <DialogActions>
                {buttons.map((b, i) => {
                    const { label, variant, color, disabled, onClick } = b;
                    return (
                        <Button
                            key={i}
                            onClick={onClick}
                            className={s.button}
                            variant={variant || 'outlined'}
                            color={color || 'secondary'}
                            disabled={disabled}
                        >
                            {label}
                        </Button>
                    );
                })}
            </DialogActions>
        </Dialog>
    );
};
