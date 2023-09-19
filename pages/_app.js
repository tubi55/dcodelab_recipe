import Layout from '@/components/template/Layout/Layout';
import '@/styles/globals.scss';
import '@/styles/theme.scss';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { keepStyle } from '@/libs/keepStyle';
import { GlobalProvider } from '@/hooks/useGlobalContext';
keepStyle(3000);

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	return (
		<GlobalProvider>
			<QueryClientProvider client={queryClient}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</GlobalProvider>
	);
}
