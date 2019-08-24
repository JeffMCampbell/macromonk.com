import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    data () {
        return {
            options: {
                legend: {
                    display: false
                },
                tooltips: false,
                responsive: true,
                maintainAspectRatio: true
                // tooltips: {
                //     callbacks: {
                //         label: function (tooltipItem, data) {
                //             var dataset = data.datasets[tooltipItem.datasetIndex]

                //             var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                //                 return previousValue + currentValue
                //             })

                //             var currentValue = dataset.data[tooltipItem.index]

                //             var percentage = Math.floor(((currentValue / total) * 100) + 0.5)

                //             return percentage + '%'
                //         }
                //     }
                // },
                // options: {

                // }
            }
        }
    },
    mounted () {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        this.renderChart(this.chartData, this.options)
    }
}
