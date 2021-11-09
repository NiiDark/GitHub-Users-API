import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Form from './Form/Form';
import {
   Wrapper,
   Container,
   MainInfo,
   Avatar,
   Name,
   Bio,
   Statistics,
   Repos,
   Followers,
   Following,
   More,
   LBWrapper,
   TCWrapper,
   Location,
   Blog,
   Twitter,
   Company,
   Looking,
   UserNotFound,
} from './GitHubInfo.styles';

function GitHubInfo() {
   const [searchValue, setSearchValue] = useState('');
   const [userInfo, setUserInfo] = useState({});
   const [notFound, setNotFound] = useState(true);
   const [firstLoad, setFirstLoad] = useState(true);
   const [loading, setLoading] = useState(false);

   const getSearchValue = (value) => {
      setSearchValue(value);
   };

   useEffect(() => {
      const API = `https://api.github.com/users/${searchValue}`;
      if (searchValue !== '') {
         setLoading(true);
         axios
            .get(API)
            .then((response) => {
               setUserInfo({ ...response.data });
               setNotFound(false);
               setFirstLoad(false);
               setLoading(false);
            })
            .catch((err) => {
               setNotFound(true);
               setFirstLoad(false);
               setLoading(false);
            });
      }
   }, [searchValue]);
   const {
      avatar_url,
      name,
      login,
      html_url,
      created_at,
      bio,
      public_repos,
      followers,
      following,
      location,
      blog,
      twitter_username,
      company,
   } = userInfo;
   const ProfileName = name || 'No Name';
   const ProfileBio = bio || 'This profile has no bio';
   const ProfileLocation = location || 'Not Available';
   const ProfileBlog = blog || 'Not Available';
   const ProfileTwitter = twitter_username || 'Not Available';
   const ProfileCompany = company || 'Not Available';

   const joinDate = new Date(created_at);
   return (
      <>
         <Form getSearchValue={getSearchValue} />
         <Wrapper>
            <Container>
               {loading ? (
                  <Looking>
                     <img src="/three-dots.svg" width="60" alt="" />
                  </Looking>
               ) : (
                  <>
                     {notFound ? (
                        <UserNotFound>
                           <h2>
                              {firstLoad
                                 ? 'Enter a GitHub username to search for the user profile.'
                                 : 'User Not Found :/'}
                           </h2>
                        </UserNotFound>
                     ) : (
                        <>
                           <MainInfo>
                              <Avatar>
                                 <img src={avatar_url} alt="avatar" />
                              </Avatar>
                              <Name name={name}>
                                 <div className="wrapper">
                                    <h2>{ProfileName}</h2>

                                    <a
                                       href={html_url}
                                       target="_blank"
                                       rel="noreferrer"
                                    >
                                       @{login}
                                    </a>
                                 </div>
                                 <h3>
                                    Joined: {joinDate.toString().slice(4, 15)}
                                 </h3>
                              </Name>
                           </MainInfo>
                           <Bio>{ProfileBio}</Bio>
                           <Statistics>
                              <Repos>
                                 <h3>Repos</h3>
                                 <h4>{public_repos}</h4>
                              </Repos>
                              <Followers>
                                 <h3>Followers</h3>
                                 <h4>{followers}</h4>
                              </Followers>
                              <Following>
                                 <h3>Following</h3>
                                 <h4>{following}</h4>
                              </Following>
                           </Statistics>
                           <More>
                              <LBWrapper>
                                 <Location location={location}>
                                    <img src="/location.svg" alt="" />
                                    <h3>{ProfileLocation}</h3>
                                 </Location>
                                 <Blog blog={blog}>
                                    <img src="/blog.svg" alt="" />
                                    <h3>{ProfileBlog}</h3>
                                 </Blog>
                              </LBWrapper>
                              <TCWrapper>
                                 <Twitter twitter={twitter_username}>
                                    <img src="/twitter.svg" alt="" />
                                    <h3>{ProfileTwitter}</h3>
                                 </Twitter>
                                 <Company company={company}>
                                    <img src="/company.svg" alt="" />
                                    <h3>{ProfileCompany}</h3>
                                 </Company>
                              </TCWrapper>
                           </More>
                        </>
                     )}
                  </>
               )}
            </Container>
         </Wrapper>
      </>
   );
}

export default GitHubInfo;
