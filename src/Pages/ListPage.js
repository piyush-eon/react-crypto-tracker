import React from 'react'
import { useParams } from 'react-router-dom';
import Banner from "../components/Banner/Banner";
import CovidInfo from '../components/CovidInfo';

const ListPage = () => {

  const { id } = useParams()

  return (
    <>
    <Banner />
    <CovidInfo />
    </>
    
)}

export default ListPage