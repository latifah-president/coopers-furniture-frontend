import styled from 'styled-components';
import {whiteColor, lightGrayColor, purpleColor, goldColor} from '../../GlobalStyles/styles';

export const ProfileNavWrapper = styled.nav`
    display: flex;
    font-size: 1rem;
    width: 100%;
    margin-top: 4rem;
    /* border: 1px solid orange; */
    box-sizing: border-box;
    justify-content: center;
    @media only screen and (max-width: 600px) {
        height: 9vh;
    }
    

`;

export const ProfileLinkContainer = styled.ul`
    display: flex;
    justify-content:space-around;
    width: 70%;
    font-weight: 400;
    /* border: 1px solid red; */
     .link {
        color: ${lightGrayColor};
       text-decoration: none;
       border-bottom: 1px solid transparent;
        cursor: pointer;
            &:hover {
                color: ${purpleColor};
            }
    }
    
    .activeRoute {
        border-bottom: 2px solid ${goldColor};
        color: ${purpleColor};
    }

    .icon {
    color: ${whiteColor};
    }
    @media only screen and (max-width: 600px) {
        width: 60%;
    }
`;