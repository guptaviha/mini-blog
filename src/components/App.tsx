import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { EditPage } from './EditPage';
import { ViewPage } from './ViewPage';

export const App = () => {
    const queryString = window.location.search;
    const urlParams2 = new URLSearchParams(queryString);
    const post = urlParams2.get("post");
    let decodedPost = '';

    if (post) {
        decodedPost = atob(post);
    }

    return (
        <ChakraProvider>
            {!post
                ? <EditPage />
                : <ViewPage post={decodedPost} />
            }
        </ChakraProvider>
    );
};

