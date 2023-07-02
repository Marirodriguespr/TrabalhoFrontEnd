import { Card, CardHeader, CardBody, Heading, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import "../pages/ListFirst.css"


const CardComp = ({ title, srcImage, altImg }) => {
    const navigate = useNavigate()

    const chamaDetail = () => {
        navigate(`/detail/${title}`)
    }

    return (
        <Card className="card" onClick={chamaDetail} align='center' maxW='sm'>
            <CardHeader>
                <Heading size='md'>{title}</Heading>
            </CardHeader>
            <CardBody>
                <Image
                    src={srcImage}
                    alt={altImg}
                    borderRadius='lg'
                />
            </CardBody>
        </Card>
    );
}

export default CardComp;