import useCarts from '@/hooks/useCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
type FavButtonProp={
    isFav: boolean,
    username: string,
    bookId: Number,
}
export default async function FavButton({isFav, username, bookId}: FavButtonProp){
    const {addFavorite} = useCarts();
    if(isFav){
        const result = await addFavorite(username, bookId)
    }
    return(
        <IconButton className="hover:text-lime-700">
            {isFav ? <FavoriteIcon sx={{ color: red[500] }}/> : <FavoriteBorderIcon />}
        </IconButton>
    );  
}