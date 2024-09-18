import { Box, Skeleton } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Image } from '@/pages/ui/auth/style.ts';
import { ImageContainer } from '@/pages/ui/TRASH/type-of-requests/style';
import { AuthModel } from '@/entities/auth';
import {
  ListItem,
  RequestsTypesApi,
  TypesOfRequestsModel,
  RequestsList,
} from '@/entities/requests';
import { Routes } from '@/shared/constants';
import { Flex } from '@/shared/ui';

const TypesOfRequests = () => {
  const navigate = useNavigate();

  const { role } = AuthModel.useAuthStore();
  const { setSelectedType } = TypesOfRequestsModel.useTypesOfRequestsStore();

  const { data, isLoading } = useQuery({
    queryKey: [RequestsTypesApi.QueryReqName.getRequestsList, { roles: role }],
    queryFn: RequestsTypesApi.getRequestTypesList,
    refetchOnWindowFocus: false,
    initialData: {},
  });

  const handleNavigate = (type: string) => {
    setSelectedType(type);
    navigate(`${Routes.MAIN}?type=${type}`);
  };

  return (
    <Box>
      <Flex $justify="space-between">
        <RequestsList>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              {data &&
                data.results &&
                data.results.map((el) => (
                  <ListItem
                    key={el.id}
                    itemName={el.name}
                    onClick={() => handleNavigate(el.name)}
                  />
                ))}
            </>
          )}
        </RequestsList>
        <ImageContainer>
          <Image src="/main.png" alt={''} />
        </ImageContainer>
      </Flex>
    </Box>
  );
};

export default TypesOfRequests;
