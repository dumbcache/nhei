<script>
    import { Router, Route } from "svelte-navigator";
    import Layout from "./Layout.svelte";
    import Home from "./components/Home.svelte";
    import Collection from "./components/Collection.svelte";
    import Section from "./components/Section.svelte";
    import Pin from "./components/Pin.svelte";
    import Profile from "./components/Profile.svelte";
    import Navigation from "./components/collections/Navigation.svelte";
</script>

<Router>
    <Layout>
        <Route path="/collections/*">
            <Navigation boardsCount={20} sectionsCount={100} pinsCount={200} />
            <Route path=":collection/*">
                <Route path=":section" component={Pin} />
                <Route path="/" component={Section} />
            </Route>
            <Route path="/" component={Collection} />
        </Route>
        <Route path="/profile" component={Profile} />
        <Route path="/" component={Home} />
    </Layout>
</Router>

<style>
    @media screen and (max-width: 600px) {
    }
</style>
