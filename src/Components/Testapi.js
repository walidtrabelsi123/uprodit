import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';
import { Box, Container, Stack, Link, Text, Image } from '@chakra-ui/react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import uprodit from '../assets/uprodit.png';
import { TbWorldWww } from 'react-icons/tb';
import generateSignature from './Utils';
import ProfileCard from './ProfileCard'

const SocialButton = ({
    children,
    label,
    href,
}) => {
    return (
        <button
            className="social-button"
            onClick={() => window.open(href, '_blank')}
        >
            {children}
            <span>{label}</span>
        </button>
    );
};


function Testapi() {
    const [searchSpecialities, setSearchSpecialities] = useState(''); 
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [authorizedKey, setAuthorizedKey] = useState(''); 
    const [searchUsername, setSearchUsername] = useState('');
    const [token, setToken] = useState('');

    const handleSearchBySpecialities = event => {
        const query = event.target.value.toLowerCase();
        setSearchSpecialities(query);
    
        const filteredItems = data.filter(item => {
            return item.specialities.some(speciality =>
                speciality.toLowerCase().includes(query)
            );
        });
    
        setFilteredData(filteredItems);
    };
    
   
  //  useEffect(() => {
    //    generateSignature().then((result) => setAuthorizedKey(result))
    //},[])

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchUsername(query);
      
        const filteredItems = data.filter((item) => {
          return (
            (item.name && item.name.toLowerCase().includes(query)) || // Search by username
            (item.surname && item.surname.toLowerCase().includes(query)) || // Search by surname
            (item.gender && item.gender.toLowerCase().includes(query)) || // Search by gender
            (item.profile_type && item.profile_type.toLowerCase().includes(query)) ||
            (item.tjm && item.tjm.toLowerCase().includes(query)) ||
            (item.image_id && item.image_id.toLowerCase && item.image_id.toLowerCase().includes(query)) // Check if image_id is a string before calling toLowerCase()
          );
        });
      
        setFilteredData(filteredItems);
      };
      

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.uprodit.com/v1/search/all?startIndex=0&maxResults=10&usecase=perso', {
                    headers: {
                        'Authorization': generateSignature('/v1/search/all?startIndex=0&maxResults=10&usecase=perso')
                    }
                });
                setData(response.data);
                setFilteredData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [authorizedKey]);


    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await axios.post('https://api.uprodit.c+om/v1/token', {
                    headers: {
                        'Authorization': authorizedKey,
                    }
                });
    
                setToken(response.data.token);
                console.log(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
    
        fetchToken();
    }, [authorizedKey]);

    
   // useEffect(() => {
     //   if (!token) return; // Don't fetch picture data if token is not yet available
    
        
        
    
        //fetchData();
    //}, [token, data, authorizedKey]); // Add token and data as dependencies

    const fetchData = async (item) => {
        try {
            // Iterate over your data and fetch each picture individually
           
                const response = await axios.get(`https://api.uprodit.com/v2/profile/picture/f/${item.image_id}`, {
                    headers: {
                        'Authorization': generateSignature(`/v2/profile/picture/f/${item.image_id}`)
                    }
                });
    
                return response.data
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    return (
    <div>
             <a href="https://www.uprodit.com/"><Image src={uprodit} alt={'Uprodit'} h={100} /></a>
        <div className="search-container">
          
            <input
                type="text"
                placeholder="Rechercher des freelances(spécialités,compétences...)"
                value={searchUsername}
                onChange={handleSearch}
                className="search-input"/>
            <input
                type="text"
                placeholder="Filtrer par spécialités"
                value={searchSpecialities}
                onChange={handleSearchBySpecialities}
                className="search-input"/>
           
        </div>  
        <ul className="card-list">
        {filteredData.map(item => (
       < ProfileCard item={item} fetchData={fetchData} />
        ))}</ul>
        <Box>
            

            <Box    style={{
                backgroundColor: '#9ddecf',
                color: 'gray.700',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '6xl',
                padding: '4',
                margin: '0 auto',
                borderTopWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'gray',
              }}>
                <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                spacing={4}
                justify={'center'}
                align={'center'}>
                <Image src={uprodit} alt={'Uprodit'} h={30} />
                <Stack direction={'row'} spacing={10}>
                    <Link as="a" href={'https://doc.uprodit.com/'} className="footer-link">
                        Documentation
                    </Link>
                    <Link as="a" href={'https://www.uprodit.com/about'} className="footer-link">
                        About
                    </Link>
                    <Link as="a" href={'https://status.uprodit.com/'} className="footer-link">
                        Status
                    </Link>
                    <Link as="a" href={'https://www.uprodit.com/#contactez'} className="footer-link">
                        Contact
                    </Link>
                </Stack>
            </Container>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text>
                        © {new Date().getFullYear()} Uprodit Challenge.
                        All rights reserved
                    </Text>
                    <Stack direction={'row'} spacing={6}>
                        <SocialButton label={'Twitter'} href={'https://www.linkedin.com/in/trabelsi-walid-861565201/'}>
                            <FaLinkedinIn className="twitter-link" />
                        </SocialButton>
                        <SocialButton label={'Portfolio'} href={'https://www.linkedin.com/in/trabelsi-walid-861565201/'}>
                        <TbWorldWww className="portfolio-link" />
                        </SocialButton>
                        <SocialButton label={'Github'} href={''}>
                        <FaGithub className="github-link" />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
 
    </div>
    
         
        );
      };
      
  
export default Testapi;

