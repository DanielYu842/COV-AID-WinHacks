import React from 'react'
import styled from 'styled-components'
import Uploader from './../components/Uploader'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`

const UploadContainer = () => {
    return (
        <Container>
            <Uploader />
        </Container>
    )
}

export default UploadContainer;