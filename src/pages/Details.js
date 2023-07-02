import { Button } from "@chakra-ui/react";
import "./ListFirst.css"
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import HeaderComp from "../components/HeaderComp";
import { Image } from "@chakra-ui/react";

const Details = () => {
    const [dataDet, setDataDet] = useState()
    const [loading, setLoading] = useState(false)
    const { nameCountry } = useParams()
    const navigate = useNavigate()

    const navigateToList = () => {
        navigate(-1)
    }

    const detailCountry = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/' + nameCountry)
            console.log(data)
            setDataDet(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [nameCountry])

    useEffect(() => { detailCountry() }, [])

    const renderUserData = () => {
        if (loading || !dataDet) {
            return <h3>Loading</h3>
        }
        return (
            <div>
                <HeaderComp text={nameCountry} />
                <div className="container">
                    <p> Id: {dataDet.id}</p>
                    <p>Nome: {dataDet.name}</p>
                    <p>Altura: {`${dataDet.height / 10}m`}</p>
                    <p>Peso: {`${dataDet.weight / 10}kg`}</p>
                    <Image className="image" src={dataDet.sprites.other['official-artwork'].front_default}  alt={""} borderRadius='lg'/>
                    <Button onClick={navigateToList}>Voltar</Button>
                </div>
            </div>
        )
    }

    return (
        renderUserData()
    );
}

export default Details;