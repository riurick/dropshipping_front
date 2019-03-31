const proxy = [{
        context: '/api-vendas',
        target: 'https://dropshipping-cadastro.herokuapp.com',
        changeOrigin: 'true'
    },
    {
        context: '/api-controle',
        target: 'https://dropshipping-pedidos.herokuapp.com',
        changeOrigin: 'true'
    }
];

module.exports = proxy;