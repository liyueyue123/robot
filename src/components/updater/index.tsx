import { Modal, ModalBody, ModalHeader,Button, ModalOverlay, useDisclosure, Box, ModalContent, IconButton, ModalCloseButton, ModalFooter, Icon } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { TauriEvent, listen } from '@tauri-apps/api/event';
import { Progress } from '@chakra-ui/react'
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import { UpdaterStatus } from "@/types/updater.d";
import { invoke } from "@tauri-apps/api/tauri";

let chunk:number = 0

/* 更新弹窗 */
export const Updater=()=>{
    const [silentUpdate,setSilentUpdate] = useState<boolean>(false)
    const [updaterInfo,setUpdaterInfo] = useState<any>()
    const [progressInfo,setProgressInfo] = useState<number>(0)
    const [updateStatus,setUpdateStatus] = useState<any>()
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(20deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    useEffect(()=>{
        /* 监听检查更新下载进度 */
        listen(TauriEvent.DOWNLOAD_PROGRESS, (e: any) => {
            console.warn('listen',e)
            setUpdateStatus(UpdaterStatus.DOWNLOAD_PROGRESS)
            if(e?.payload?.chunkLength){
                chunk  += e.payload.chunkLength
                setProgressInfo((chunk / e.payload.contentLength)*100)
            }
        })
        /* 监听下载状态 */
        listen(TauriEvent.STATUS_UPDATE,(e: any)=>{
            console.warn('e----状态',e)
            if(e?.payload?.status==='DONE'){
                setTimeout(()=>{
                    setUpdateStatus(UpdaterStatus.DOWNLOADED)
                },500)
            }
        })
        /* 监听自动更新状态-强制更新 */
        listen('silent_install_dialog_envet',(e: any)=>{
            console.warn('silent_install_dialog_envet---',JSON.parse(e.payload))
            setUpdaterInfo(JSON.parse(e.payload))
            setSilentUpdate(false)
            setUpdateStatus(UpdaterStatus.SILENT)
            onOpen()
        })
        /* 监听手动更新状态 */
        listen('prompt_for_install_dialog_envet',(e:any)=>{
            console.warn('prompt_for_install_dialog_envet---',JSON.parse(e.payload))
            setUpdaterInfo(JSON.parse(e.payload))
            setSilentUpdate(true)
            setUpdateStatus(UpdaterStatus.PROMPT)
            onOpen()
        })
        /* 监听已是最新版本状态 */
        listen('already_up_to_date_dialog_envet',(e: any)=>{
            console.warn('already_up_to_date_dialog_envet---',JSON.parse(e.payload))
            setUpdaterInfo(JSON.parse(e.payload))
            setUpdateStatus(UpdaterStatus.ALREADY_UPDATE)
            setSilentUpdate(false)
            onOpen()
        })
    },[onClose, onOpen])

    /* 重启 */
    const handleRestart = async ()=>{
        onClose()
        await invoke('app_restart')
    }
    /* 更新安装包 */
    const handleUpdate=async ()=>{
        await invoke('download_and_install')
    }
    return (
        <>
            {/* <Button
                variant='link'
                colorScheme='teal'
                onClick={async () => {
                    setOverlay(<OverlayOne />)
                    console.warn('updateStatus--',updateStatus)
                    // onOpen()
                }}
            >检查更新</Button> */}
            <Modal size='xl' isCentered isOpen={isOpen} onClose={silentUpdate?onClose:()=>{}}>
                {/* {overlay} */}
                <ModalContent className='p-6 min-h-80'>
                    <ModalHeader className='flex items-center'>
                        {/* <IconButton
                            isRound={true}
                            variant='solid'
                            colorScheme='teal'
                            aria-label='Done'
                            icon={<CheckIcon />}
                            fontSize={12}
                            size='xs'
                            className='mr-2'
                        /> */}
                        <Icon fontSize={22} color='blue.500' className='mr-2' as={WarningIcon} />
                        {[UpdaterStatus.SILENT,UpdaterStatus.PROMPT,UpdaterStatus.ALREADY_UPDATE].includes(updateStatus)?updaterInfo?.title:
                        [UpdaterStatus.DOWNLOAD_PROGRESS].includes(updateStatus)?'版本更新中':
                        [UpdaterStatus.DOWNLOADED].includes(updateStatus)?'重新启动应用程序':''}
                    </ModalHeader>
                    {silentUpdate&&<ModalCloseButton />}
                    <ModalBody className='flex flex-col justify-items-center rounded-lg' whiteSpace={'pre-line'}>
                        {[UpdaterStatus.SILENT,UpdaterStatus.PROMPT,UpdaterStatus.ALREADY_UPDATE,UpdaterStatus.DOWNLOAD_PROGRESS].includes(updateStatus)?updaterInfo?.msg:
                        [UpdaterStatus.DOWNLOADED].includes(updateStatus)?'应用安装成功，立即重新启动应用程序！':''}
                        {[UpdaterStatus.DOWNLOAD_PROGRESS].includes(updateStatus)&&<Box className='box-border py-4'>
                            <Box>{Math.round(progressInfo)}%</Box>
                            <Progress className='mb-6 rounded-md' hasStripe value={progressInfo} />
                        </Box>}
                    </ModalBody>
                    <ModalFooter>
                        {[UpdaterStatus.SILENT,UpdaterStatus.PROMPT].includes(updateStatus)&&<Button mr={3} colorScheme='blue' onClick={handleUpdate}>更新</Button>}
                        {[UpdaterStatus.DOWNLOADED].includes(updateStatus)&&<Button mr={3} colorScheme='blue' onClick={handleRestart}>重启</Button>}
                        {[UpdaterStatus.ALREADY_UPDATE].includes(updateStatus)&&<Button mr={3} colorScheme='blue' onClick={onClose}>确定</Button>}
                        {silentUpdate&&<Button onClick={onClose}>取消</Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}