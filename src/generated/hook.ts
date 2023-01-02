/**
 * Generated by orval v6.6.4 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey
} from 'react-query'
import type {
  PhilipsHueLightInboundDto,
  SignUpOutboundDto,
  SignUpInboundDto,
  RecipeOutboundDto,
  CreateRecipeOutboundDto,
  CreateRecipeInboundDto,
  PortfolioContactOutboundDto,
  PortfolioContactInboundDto,
  EmailInboundDto,
  BookingOutboundDto,
  Booking,
  BookingInboundDto,
  TeamUserOutboundDto,
  ConnectedUserOutboundDto,
  TicketsOutboundDto,
  RestaurantOutboundDto,
  PhilipsHueLightOutboundDto
} from './model'
import { customInstance } from '../services/network'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncReturnType<
T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any;


export const updateLightById = (
    lightId: number,
    philipsHueLightInboundDto: PhilipsHueLightInboundDto,
 ) => {
      return customInstance<void>(
      {url: `/api/lights/${lightId}`, method: 'put',
      data: philipsHueLightInboundDto
    },
      );
    }
  


    export const useUpdateLightById = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof updateLightById>, TError,{lightId: number;data: PhilipsHueLightInboundDto}, TContext>, }
) => {
      const {mutation: mutationOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof updateLightById>, {lightId: number;data: PhilipsHueLightInboundDto}> = (props) => {
          const {lightId,data} = props || {};

          return  updateLightById(lightId,data,)
        }

      return useMutation<AsyncReturnType<typeof updateLightById>, TError, {lightId: number;data: PhilipsHueLightInboundDto}, TContext>(mutationFn, mutationOptions)
    }
    
export const signUp = (
    signUpInboundDto: SignUpInboundDto,
 ) => {
      return customInstance<SignUpOutboundDto>(
      {url: `/api/users/sign-up`, method: 'post',
      data: signUpInboundDto
    },
      );
    }
  


    export const useSignUp = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof signUp>, TError,{data: SignUpInboundDto}, TContext>, }
) => {
      const {mutation: mutationOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof signUp>, {data: SignUpInboundDto}> = (props) => {
          const {data} = props || {};

          return  signUp(data,)
        }

      return useMutation<AsyncReturnType<typeof signUp>, TError, {data: SignUpInboundDto}, TContext>(mutationFn, mutationOptions)
    }
    
export const getRecipes = (
    
 ) => {
      return customInstance<RecipeOutboundDto[]>(
      {url: `/api/recipes`, method: 'get'
    },
      );
    }
  

export const getGetRecipesQueryKey = () => [`/api/recipes`];

    
export const useGetRecipes = <TData = AsyncReturnType<typeof getRecipes>, TError = unknown>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof getRecipes>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getGetRecipesQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof getRecipes>> = () => getRecipes();

  const query = useQuery<AsyncReturnType<typeof getRecipes>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


export const createRecipe = (
    createRecipeInboundDto: CreateRecipeInboundDto,
 ) => {
      return customInstance<CreateRecipeOutboundDto>(
      {url: `/api/recipes`, method: 'post',
      data: createRecipeInboundDto
    },
      );
    }
  


    export const useCreateRecipe = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof createRecipe>, TError,{data: CreateRecipeInboundDto}, TContext>, }
) => {
      const {mutation: mutationOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof createRecipe>, {data: CreateRecipeInboundDto}> = (props) => {
          const {data} = props || {};

          return  createRecipe(data,)
        }

      return useMutation<AsyncReturnType<typeof createRecipe>, TError, {data: CreateRecipeInboundDto}, TContext>(mutationFn, mutationOptions)
    }
    
export const getPortfolioContacts = (
    
 ) => {
      return customInstance<PortfolioContactOutboundDto>(
      {url: `/api/portfolio-contacts`, method: 'get'
    },
      );
    }
  

export const getGetPortfolioContactsQueryKey = () => [`/api/portfolio-contacts`];

    
export const useGetPortfolioContacts = <TData = AsyncReturnType<typeof getPortfolioContacts>, TError = unknown>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof getPortfolioContacts>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getGetPortfolioContactsQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof getPortfolioContacts>> = () => getPortfolioContacts();

  const query = useQuery<AsyncReturnType<typeof getPortfolioContacts>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


export const createPortfolioContact = (
    portfolioContactInboundDto: PortfolioContactInboundDto,
 ) => {
      return customInstance<PortfolioContactOutboundDto>(
      {url: `/api/portfolio-contacts`, method: 'post',
      data: portfolioContactInboundDto
    },
      );
    }
  


    export const useCreatePortfolioContact = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof createPortfolioContact>, TError,{data: PortfolioContactInboundDto}, TContext>, }
) => {
      const {mutation: mutationOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof createPortfolioContact>, {data: PortfolioContactInboundDto}> = (props) => {
          const {data} = props || {};

          return  createPortfolioContact(data,)
        }

      return useMutation<AsyncReturnType<typeof createPortfolioContact>, TError, {data: PortfolioContactInboundDto}, TContext>(mutationFn, mutationOptions)
    }
    
export const sendEmail = (
    emailInboundDto: EmailInboundDto,
 ) => {
      return customInstance<string>(
      {url: `/api/emails`, method: 'post',
      data: emailInboundDto
    },
      );
    }
  


    export const useSendEmail = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof sendEmail>, TError,{data: EmailInboundDto}, TContext>, }
) => {
      const {mutation: mutationOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof sendEmail>, {data: EmailInboundDto}> = (props) => {
          const {data} = props || {};

          return  sendEmail(data,)
        }

      return useMutation<AsyncReturnType<typeof sendEmail>, TError, {data: EmailInboundDto}, TContext>(mutationFn, mutationOptions)
    }
    
export const createEmailWithTemplate = (
    
 ) => {
      return customInstance<string>(
      {url: `/api/emails/with-template`, method: 'post'
    },
      );
    }
  


    export const useCreateEmailWithTemplate = <TError = unknown,
    TVariables = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof createEmailWithTemplate>, TError,TVariables, TContext>, }
) => {
      const {mutation: mutationOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof createEmailWithTemplate>, TVariables> = () => {
          ;

          return  createEmailWithTemplate()
        }

      return useMutation<AsyncReturnType<typeof createEmailWithTemplate>, TError, TVariables, TContext>(mutationFn, mutationOptions)
    }
    
export const createTemplate = (
    
 ) => {
      return customInstance<string>(
      {url: `/api/emails/templates`, method: 'post'
    },
      );
    }
  


    export const useCreateTemplate = <TError = unknown,
    TVariables = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof createTemplate>, TError,TVariables, TContext>, }
) => {
      const {mutation: mutationOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof createTemplate>, TVariables> = () => {
          ;

          return  createTemplate()
        }

      return useMutation<AsyncReturnType<typeof createTemplate>, TError, TVariables, TContext>(mutationFn, mutationOptions)
    }
    
export const deleteTemplate = (
    
 ) => {
      return customInstance<string>(
      {url: `/api/emails/templates`, method: 'delete'
    },
      );
    }
  


    export const useDeleteTemplate = <TError = unknown,
    TVariables = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof deleteTemplate>, TError,TVariables, TContext>, }
) => {
      const {mutation: mutationOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof deleteTemplate>, TVariables> = () => {
          ;

          return  deleteTemplate()
        }

      return useMutation<AsyncReturnType<typeof deleteTemplate>, TError, TVariables, TContext>(mutationFn, mutationOptions)
    }
    
export const createEmailFromPortfolio = (
    
 ) => {
      return customInstance<string>(
      {url: `/api/emails/portfolio/contact`, method: 'post'
    },
      );
    }
  


    export const useCreateEmailFromPortfolio = <TError = unknown,
    TVariables = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof createEmailFromPortfolio>, TError,TVariables, TContext>, }
) => {
      const {mutation: mutationOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof createEmailFromPortfolio>, TVariables> = () => {
          ;

          return  createEmailFromPortfolio()
        }

      return useMutation<AsyncReturnType<typeof createEmailFromPortfolio>, TError, TVariables, TContext>(mutationFn, mutationOptions)
    }
    
export const getBookings = (
    
 ) => {
      return customInstance<BookingOutboundDto[]>(
      {url: `/api/bookings`, method: 'get'
    },
      );
    }
  

export const getGetBookingsQueryKey = () => [`/api/bookings`];

    
export const useGetBookings = <TData = AsyncReturnType<typeof getBookings>, TError = unknown>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof getBookings>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getGetBookingsQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof getBookings>> = () => getBookings();

  const query = useQuery<AsyncReturnType<typeof getBookings>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


export const createBooking = (
    bookingInboundDto: BookingInboundDto,
 ) => {
      return customInstance<Booking>(
      {url: `/api/bookings`, method: 'post',
      data: bookingInboundDto
    },
      );
    }
  


    export const useCreateBooking = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof createBooking>, TError,{data: BookingInboundDto}, TContext>, }
) => {
      const {mutation: mutationOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof createBooking>, {data: BookingInboundDto}> = (props) => {
          const {data} = props || {};

          return  createBooking(data,)
        }

      return useMutation<AsyncReturnType<typeof createBooking>, TError, {data: BookingInboundDto}, TContext>(mutationFn, mutationOptions)
    }
    
export const confirmBooking = (
    bookingId: string,
 ) => {
      return customInstance<Booking>(
      {url: `/api/bookings/${bookingId}/confirm`, method: 'post'
    },
      );
    }
  


    export const useConfirmBooking = <TError = unknown,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof confirmBooking>, TError,{bookingId: string}, TContext>, }
) => {
      const {mutation: mutationOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof confirmBooking>, {bookingId: string}> = (props) => {
          const {bookingId} = props || {};

          return  confirmBooking(bookingId,)
        }

      return useMutation<AsyncReturnType<typeof confirmBooking>, TError, {bookingId: string}, TContext>(mutationFn, mutationOptions)
    }
    
export const getTeamUsers = (
    
 ) => {
      return customInstance<TeamUserOutboundDto[]>(
      {url: `/api/users`, method: 'get'
    },
      );
    }
  

export const getGetTeamUsersQueryKey = () => [`/api/users`];

    
export const useGetTeamUsers = <TData = AsyncReturnType<typeof getTeamUsers>, TError = unknown>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof getTeamUsers>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getGetTeamUsersQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof getTeamUsers>> = () => getTeamUsers();

  const query = useQuery<AsyncReturnType<typeof getTeamUsers>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


export const getConnectedUser = (
    
 ) => {
      return customInstance<ConnectedUserOutboundDto>(
      {url: `/api/users/me`, method: 'get'
    },
      );
    }
  

export const getGetConnectedUserQueryKey = () => [`/api/users/me`];

    
export const useGetConnectedUser = <TData = AsyncReturnType<typeof getConnectedUser>, TError = unknown>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof getConnectedUser>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getGetConnectedUserQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof getConnectedUser>> = () => getConnectedUser();

  const query = useQuery<AsyncReturnType<typeof getConnectedUser>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


export const getTickets = (
    
 ) => {
      return customInstance<TicketsOutboundDto[]>(
      {url: `/api/tickets`, method: 'get'
    },
      );
    }
  

export const getGetTicketsQueryKey = () => [`/api/tickets`];

    
export const useGetTickets = <TData = AsyncReturnType<typeof getTickets>, TError = unknown>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof getTickets>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getGetTicketsQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof getTickets>> = () => getTickets();

  const query = useQuery<AsyncReturnType<typeof getTickets>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


export const getRestaurants = (
    
 ) => {
      return customInstance<RestaurantOutboundDto[]>(
      {url: `/api/restaurants`, method: 'get'
    },
      );
    }
  

export const getGetRestaurantsQueryKey = () => [`/api/restaurants`];

    
export const useGetRestaurants = <TData = AsyncReturnType<typeof getRestaurants>, TError = unknown>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof getRestaurants>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getGetRestaurantsQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof getRestaurants>> = () => getRestaurants();

  const query = useQuery<AsyncReturnType<typeof getRestaurants>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


export const getLights = (
    
 ) => {
      return customInstance<PhilipsHueLightOutboundDto[]>(
      {url: `/api/lights`, method: 'get'
    },
      );
    }
  

export const getGetLightsQueryKey = () => [`/api/lights`];

    
export const useGetLights = <TData = AsyncReturnType<typeof getLights>, TError = unknown>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof getLights>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getGetLightsQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof getLights>> = () => getLights();

  const query = useQuery<AsyncReturnType<typeof getLights>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


export const getHealth = (
    
 ) => {
      return customInstance<string>(
      {url: `/api/health`, method: 'get'
    },
      );
    }
  

export const getGetHealthQueryKey = () => [`/api/health`];

    
export const useGetHealth = <TData = AsyncReturnType<typeof getHealth>, TError = unknown>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof getHealth>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getGetHealthQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof getHealth>> = () => getHealth();

  const query = useQuery<AsyncReturnType<typeof getHealth>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


