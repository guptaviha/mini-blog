import { Stack, Button, Box, Fade, IconButton, Popover, PopoverContent, PopoverTrigger, Table, TableContainer, Tbody, Td, Tr, useColorMode } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsVolumeUp, BsVolumeMute, BsFacebook } from 'react-icons/bs';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import { FiBarChart2 } from 'react-icons/fi';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { BsInfo, BsGithub, BsTwitter } from 'react-icons/bs';
import { StatsType } from './EditPage';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { PublishButton } from './PublishButton';

const camelToTitleCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
};

type FloatingControlsProps = {
    postContent: string;
    stats: StatsType;
    show: boolean;
    soundOn: boolean;
    setSoundOn: (soundOn: boolean) => void;
};

export const FloatingControls = (props: FloatingControlsProps) => {
    const { stats, show, soundOn, postContent, setSoundOn } = props;
    const [statsBoxOpen, setStatsBoxOpen] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <PublishButton id="publish-btn" onClick={() => {
                const encodedPost = btoa(postContent);
                window.location.search = `?post=${encodedPost}`
            }} />
            <Fade style={{ transitionDuration: '0.4s' }} in={show}>
                <IconButton
                    _focus={{ outline: "none" }}
                    onClick={() => setSoundOn(!soundOn)}
                    position='fixed'
                    top='10px'
                    right='10px'
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    size='lg'
                    fontSize='30px'
                    icon={soundOn ? <BsVolumeUp /> : <BsVolumeMute />}
                />
                <IconButton
                    _focus={{ outline: "none" }}
                    onClick={() => toggleColorMode()}
                    position='fixed'
                    top='10px'
                    right='60px'
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    size='lg'
                    fontSize='30px'
                    icon={colorMode === 'dark' ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
                />
                <IconButton
                    _focus={{ outline: "none" }}
                    onClick={onOpen}
                    position='fixed'
                    top='10px'
                    right='110px'
                    aria-label='audio-toggle'
                    variant='ghost'
                    isRound={true}
                    size='lg'
                    fontSize='30px'
                    icon={<BsInfo />}
                />
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Welcome to mini-blog!
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            The serverless instant-publish blog platform that lets you publish as fast as you can write.
                            <br></br>
                            <br></br>
                            <b>Remember to save your blog URL</b> because all the content of your blog post lives in the URL. The application does not talk to a database or server of any kind.
                            <br></br>
                            <br></br>

                            <Stack spacing={4} direction='row' align='center'>
                                <Button _focus={{ outline: "none" }} colorScheme='teal' size='xs'>
                                    open-source
                                </Button>
                                <Button _focus={{ outline: "none" }} colorScheme='teal' size='xs'>
                                    serverless
                                </Button>
                                <Button _focus={{ outline: "none" }} colorScheme='teal' size='xs'>
                                    markdown-supported
                                </Button>
                                {/* <Button _focus={{ outline: "none" }} colorScheme='teal' size='xs'>
                                    b64 encoding
                                </Button> */}
                            </Stack>
                            <br></br>


                            <IconButton
                                _focus={{ outline: "none" }}
                                onClick={() =>
                                    window.open(
                                        'https://github.com/guptaviha/mini-blog',
                                        '_blank'
                                    )
                                }
                                variant='ghost'
                                isRound={true}
                                size='lg'
                                fontSize='30px'
                                aria-label='audio-toggle'
                                icon={<BsGithub />}
                            />
                            <IconButton
                                _focus={{ outline: "none" }}
                                onClick={() =>
                                    window.open(
                                        'https://twitter.com/intent/tweet?text=Check%20this%20out!%20Minimalistic%20and%20quick%20blogging%20is%20here:%20miniblog.ink',
                                        '_blank'
                                    )
                                }
                                variant='ghost'
                                isRound={true}
                                size='lg'
                                fontSize='30px'
                                aria-label='audio-toggle'
                                icon={<BsTwitter />}
                            />
                            <IconButton
                                _focus={{ outline: "none" }}
                                onClick={() =>
                                    window.open(
                                        'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fminiblog.ink%2F&amp;src=sdkpreparse',
                                        '_blank'
                                    )
                                }
                                variant='ghost'
                                isRound={true}
                                size='lg'
                                fontSize='30px'
                                aria-label='audio-toggle'
                                icon={<BsFacebook />}
                            />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='whatsapp' onClick={onClose}>
                                Got it!
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Popover>
                    <PopoverTrigger>
                        <IconButton
                            _focus={{ outline: "none" }}
                            onClick={() => setStatsBoxOpen(!statsBoxOpen)}
                            position='fixed'
                            bottom='10px'
                            left='10px'
                            aria-label='stats-count'
                            variant='ghost'
                            size='lg'
                            fontSize='30px'
                            isRound={true}
                            icon={<FiBarChart2 />}
                        />
                    </PopoverTrigger>
                    <PopoverContent left='10px' _focus={{ outline: "none" }}>
                        <Box>
                            <TableContainer>
                                <Table variant='unstyled'>
                                    <Tbody>
                                        {Object.keys(stats).map((statKey) => (
                                            <Tr key={statKey}>
                                                <Td>{camelToTitleCase(statKey)}</Td>
                                                <Td>{stats[statKey]}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </PopoverContent>
                </Popover>
            </Fade>
        </>
    )
};
