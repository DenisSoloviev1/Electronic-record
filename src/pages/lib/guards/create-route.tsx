import { FC } from 'react';
import { Route } from 'react-router-dom';
import { IRoute } from '@/shared/types';
import { PrivateRoute } from './private-route';

export const CreateRoute: FC<IRoute> = ({ component, path, id, ...route }) => {
  return (
    <Route
      path={path}
      key={id}
      element={
        <PrivateRoute
          withLayout={route.withLayout}
          roles={route.roles}
          element={component}
          isPublic={route.isPublic}
        />
      }
      {...route}
    />
  );
};
