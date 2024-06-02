import useCarts from '@/hooks/useCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { red } from "@mui/material/colors";
import { useRouter, useSearchParams } from 'next/navigation';

type favIconProp = {
    isFav: boolean;
}

export default function FavIcon( {isFav}: favIconProp ) {
    const { removeFavorite } = useCarts();
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const username = params.get("username");
    const bookId = params.get("bookId");
    const handleOnclick = async() => {
        if (username && bookId){
            await removeFavorite(username, Number(bookId));
            router.refresh();
        }
        else {
            alert("Please login first!");
            router.push("/login");
        }
        
    }
    return (
        <>
        {isFav ? <FavoriteIcon sx={{ color: red[500] }} onClick ={handleOnclick}/> : <FavoriteBorderIcon />}
        </>
    );
}