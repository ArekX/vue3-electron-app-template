import { reactive } from 'vue';

export default reactive({
    previousPage: null,
    currentPage: 'Main',
    goTo(pageName) {
        this.previousPage = this.currentPage;
        this.currentPage = pageName;
    },
    goBack() {
        this.currentPage = this.previousPage;
    }
});