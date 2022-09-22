import { useRouter } from 'next/router';
import Link from "next/link";


export const Locale = () =>{
    let router = useRouter
    return(
        <ul>
            <li><Link href="ru"><a>ru</a></Link></li>
            <li><Link href="uk"><a>uk</a></Link></li>
        </ul>
     
    )
}
