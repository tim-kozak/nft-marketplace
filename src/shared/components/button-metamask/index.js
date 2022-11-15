import s from './styles.module.scss';
import {Button, CircularProgress} from "@mui/material";
import {cn} from "../../../core/utils/classNames";

export const ButtonMetamask = ({ isLoading, onClick, disabled}) => {

    return <div className={cn(s.button, { [s.disabled]: disabled })}>
        { isLoading
            ? <CircularProgress />
            : <Button
                variant="outlined"
                className={s.connect}
                disabled={isLoading || disabled}
                onClick={onClick}
            >
                Connect Metamask
            </Button>
        }
    </div>;
}