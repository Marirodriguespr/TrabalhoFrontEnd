import { useCallback, useEffect, useState } from "react";
import "./ListFirst.css"
import axios from "axios";
import CardComp from "../components/CardComp";
import { Flex, IconButton, SimpleGrid } from "@chakra-ui/react";
import HeaderComp from "../components/HeaderComp";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";


const Pagination = ({ request, offset }) => {

    const nextPage = () => {
        request(offset + 20)
    }

    const previousPage = () => {
        if (offset === 0) return
        request(offset - 20)
    }

    return (
        <Flex gap={4}>
            <IconButton onClick={previousPage} icon={<ArrowLeftIcon />} />
            <IconButton onClick={nextPage} icon={<ArrowRightIcon />} />
        </Flex>
    )
}

const ListFirst = () => {
    const [loading, setLoading] = useState(false)
    const [dataCountries, setData] = useState([])
    const [offset, setOffset] = useState(0);


    const listCountries = useCallback(async (paramOffset) => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', {
                params: {
                    limit: 20,
                    offset: paramOffset
                }
            })
            console.log(data)
            const promiseArray = data.results.map(obj => {
                return axios.get(obj.url)
            })
            const promiseResult = await Promise.all(promiseArray)
            const countrieData = promiseResult.map(result => result.data)
            setData(countrieData)
            setOffset(paramOffset)
        } catch (error) {
            console.error(error)
        } finally { 
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        listCountries(0)
    }, [])

    const renderUserData = () => {
        if (loading) {
            return (<h3>Loading</h3>)
        }
        return (
            <div>
                <HeaderComp text="Pokemons" />
                <div className="container">
                    <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                        {
                            dataCountries.map(obj => (
                                <CardComp title={obj.name} srcImage={obj.sprites.other['official-artwork'].front_default} altImg={""} />
                            ))
                        }
                        <Pagination offset={offset} request={listCountries} />
                    </SimpleGrid>
                </div>
            </div>

        )
    }

    return (
        renderUserData()
    );
}
export default ListFirst;