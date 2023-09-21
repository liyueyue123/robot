import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,Button, ModalOverlay, useDisclosure, Box, Spinner, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { message,ask } from '@tauri-apps/api/dialog';
import { TauriEvent, listen } from '@tauri-apps/api/event';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { Progress } from '@chakra-ui/react'
import { relaunch } from '@tauri-apps/api/process';

let chunk:number = 0

/* 更新弹窗 */
export const UpdateModal=()=>{
    const [okLoading,setOkLoading] = useState<boolean>(false)
    const [logsLoading,setLogsLoading] = useState<boolean>(false)
    const [progressInfo,setProgressInfo] = useState<number>(0)
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(20deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    useEffect(()=>{
        listen(TauriEvent.DOWNLOAD_PROGRESS, (e: any) => {
            console.warn('listen',e)
            onOpen()
            if(e?.payload?.chunkLength){
                chunk  += e.payload.chunkLength
                setProgressInfo((chunk / e.payload.contentLength)*100)
            }
        })
        listen(TauriEvent.STATUS_UPDATE,(e: any)=>{
            console.warn('e----状态',e)
            onClose()
        })
    },[onClose, onOpen])
    const handleRestart = ()=>{
        onClose()
        relaunch()
    }
    return (
        <>
            <Button
                variant='link'
                colorScheme='teal'
                onClick={async () => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >检查更新</Button>
            <Modal size='lg' isCentered isOpen={isOpen} onClose={()=>{}}>
                {/* {overlay} */}
                <ModalContent>
                    <ModalHeader>版本更新中</ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody className='flex flex-col'>
                        {logsLoading?
                        <Box className='flex justify-center'>
                            <Spinner 
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                        </Box>:
                        <>
                            <Box>{Math.round(progressInfo/2)}%</Box>
                            <Progress className='mb-6' hasStripe value={progressInfo/2} />
                        </>}
                    </ModalBody>
                    <ModalFooter>
                        {/* {status==='DONE'&&<Button mr={3} colorScheme='blue' onClick={handleRestart}>重启</Button>} */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}