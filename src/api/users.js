import axios from 'axios'
export default {
    index( params ){
        return axios.get( 'http://localhost:3001/users', {
            params: params
        })
    },

    show( id ){
        return axios.get( 'users/'+id );
    },

    update( id, data ){
        return axios.put( 'users/'+id, data );
    },

    create( data ){
        return axios.post( 'users/', data );
    },

    delete( id ){
        return axios.delete( 'users/' + id )
    }
}