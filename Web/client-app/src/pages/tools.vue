<template>

    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-container  kt-container--fluid ">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">
                    {{ _["Cutting Optimization"] }}
                </h3>
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="#" class="kt-subheader__breadcrumbs-home"><i class="flaticon2-layers-2"></i></a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">
                        {{ _["Utilities"] }}
                    </a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">
                        {{ _["Cutting Optimization"] }}
                    </a>

                    <!-- <span class="kt-subheader__breadcrumbs-link kt-subheader__breadcrumbs-link--active">Active link</span> -->
                </div>
            </div>
            <div class="kt-subheader__toolbar">
                <div class="kt-subheader__wrapper">
                    
                </div>
            </div>
        </div>
    </div>

    <!-- end:: Subheader -->


    <SmartCut msg="" />

</template>

<script>
    import SmartCut from '../components/smart-cut.vue'

    export default {
        name: 'Tools',
        components: {
            SmartCut
        },
        data: function () {
            return {
                _: window._resources["SmartCut"]
            }
        }
    }
</script>
