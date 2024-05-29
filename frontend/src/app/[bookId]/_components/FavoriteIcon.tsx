import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { red } from "@mui/material/colors";

type favIconProp = {
    isFav: boolean;
}

export default function FavIcon( {isFav}: favIconProp ) {
    return (
        <>
        {isFav ? <FavoriteIcon sx={{ color: red[500] }}/> : <FavoriteBorderIcon />}
        </>
    );
}