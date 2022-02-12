<script>
    import { Router, Route } from "svelte-navigator";
    import Layout from "./Layout.svelte";
    import Home from "./components/Home.svelte";
    import Board from "./components/Board.svelte";
    import Section from "./components/Section.svelte";
    import Pin from "./components/Pin.svelte";
    import Profile from "./components/Profile.svelte";
    import Doujin from "./components/Doujin.svelte";
</script>

<Router>
    <Layout>
        <Route path="/boards/*">
            <Route path=":board/*">
                <Route path=":section" component={Pin} />
                <Route path="/" component={Section} />
            </Route>
            <Route path="/" component={Board} />
        </Route>
        <Route path="/profile" component={Profile} />
        <Route path="/doujin" component={Doujin} />
        <Route path="/" component={Home} />
    </Layout>
</Router>

<style>
    @media screen and (max-width: 600px) {
    }
</style>
