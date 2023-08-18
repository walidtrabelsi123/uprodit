import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';
import {  Container, Stack, Link, Text, Image } from '@chakra-ui/react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import uprodit from '../assets/uprodit.png';
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
    
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchUsername(query);
        const filteredItems = data.filter((item) => {
          return (
            (item.name && item.name.toLowerCase().includes(query)) || 
            (item.surname && item.surname.toLowerCase().includes(query)) || 
            (item.gender && item.gender.toLowerCase().includes(query)) || 
            (item.profile_type && item.profile_type.toLowerCase().includes(query)) ||
            (item.tjm && item.tjm.toLowerCase().includes(query)) ||
            (item.image_id && item.image_id.toLowerCase && item.image_id.toLowerCase().includes(query)) 
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


    
    
    const fetchData = async (item) => {
        try {
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
    <ProfileCard key={item.id} item={item} fetchData={fetchData} />
  ))}
</ul>

        <div>
            <div style={{ backgroundColor: '#9ddecf', color: 'gray.700', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                maxWidth: '6xl', padding: '4', margin: '0 auto', borderTopWidth: '1px',borderStyle: 'solid',borderColor: 'gray', }}>
            <Container as={Stack} maxW={'6xl'} py={4} spacing={4} justify={'center'} align={'center'}>
                <Image src={uprodit} alt={'Uprodit'} h={40} />
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
                <Container as={Stack} maxW={'6xl'} py={4} direction={{ base: 'column', md: 'row' }} spacing={4} justify={{ base: 'center', md: 'space-between' }} align={{ base: 'center', md: 'center' }}>
                    <Text>
                        © {new Date().getFullYear()} Uprodit Challenge. All rights reserved
                    </Text>
                    <Stack direction={'row'} spacing={6}>
                        <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/in/trabelsi-walid-861565201/'}>
                            <FaLinkedinIn className="twitter-link" />
                        </SocialButton>
                        <SocialButton label={'Github'} href={'https://github.com/walidtrabelsi123'}>
                            <FaGithub className="github-link" />
                        </SocialButton>
                    </Stack>
                </Container>
            </div>
        </div>
    </div>);};
export default Testapi;

