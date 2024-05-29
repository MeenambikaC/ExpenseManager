import moment from 'moment'


export const Date=(date)=>{
    return moment(date).format('DD-MM-YYYY')
}
