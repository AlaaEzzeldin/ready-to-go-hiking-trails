import axios from 'axios'
export default {
    index( params ){
        return axios.get( 'http://localhost:3001/hikes', {
            params: params
        })
    },

    show( id ){
        return axios.get( 'posts/'+id );
    },

    update( id, data ){
        return axios.put( 'posts/'+id, data );
    },

    create( data ){
        return axios.post( 'posts/', data );
    },

    delete( id ){
        return axios.delete( 'posts/' + id )
    }
}