"use client"
import Main from "@/components/Layout/Main/page";
import { Box,Text, Card, CardBody, CardHeader, Heading, Stack, StackDivider } from "@chakra-ui/react";

const SettingsPage = () => {
  return (
    <Main>
      <Box className='w-full text-2xl font-bold text-blue-700 pb-6'>系统设置</Box>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='lg' textTransform='uppercase'>
                关于
              </Heading>
              <Text pt='2' size='md'>
                版本信息：v1.0
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Main>
    
  )
};

export default SettingsPage;
