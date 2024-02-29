<script lang="ts">
    import { onMount } from 'svelte';
    import CryptoES from 'crypto-es';
    import { t } from '$lib/i18n';
    import { users, addUser, setUser } from '$lib/util/users';
    import { Button, Divider, Input } from '$lib/components';
    import { Column, Row } from '$lib/components/layout';
    import { goto } from '$app/navigation';

    let usernameValue = '';
    let passwordValue = '';
    let usernameError = '';
    let passwordError = '';
    let selectedUser = -1;

    $: {
        selectedUser;
        usernameValue = '';
        passwordValue = '';
        usernameError = '';
        passwordError = '';
    }

    $: if (selectedUser > -1) {
        usernameValue = $users[selectedUser].name;
    }

    function onUserClick(index: number) {
        selectedUser = index;
    }

    function onLogin() {
        if (passwordValue === '') {
            return passwordError = 'auth.password-empty';
        }

        if ($users[selectedUser].password !== `${CryptoES.SHA256(passwordValue)}`) {
            return passwordError = 'auth.password-incorrect';
        }

        setUser(selectedUser);

        goto('/dashboard');
    }

    function onCreate() {
        if (usernameValue === '') {
            usernameError = 'auth.username-empty';
        } else {
            usernameError = '';
        }

        if (passwordValue === '') {
            passwordError = 'auth.password-empty';
        } else {
            passwordError = '';
        }

        if (usernameError || passwordError) return;

        addUser(usernameValue, passwordValue);

        usernameValue = '';
        passwordValue = '';
        selectedUser = $users.length - 1;
    }

    onMount(() => {
        if ($users.length) {
            selectedUser = 0;
        }
    });
</script>

<Column grow={0} layout="rounded-md px-4 pt-6 pb-4 bg-slate-700/20 w-80">
    {#if selectedUser > -1}
        <Row justify={1}>
            <img src="/{selectedUser % 9}.jpg" alt="profile_placeholder" class="w-40 rounded-full mb-4" />
        </Row>
    {:else}
        <Row layout="mb-4">
            {$t('auth.create-user')}
        </Row>
    {/if}
    <Input disabled={selectedUser > -1} bind:value={usernameValue} labelClass="has-[:disabled]:opacity-50 flex-col mb-4" class="mt-1 transition bg-transparent border-2 border-solid border-white/30 hover:border-white/40 focus:border-white/60 placeholder-gray-400 {usernameError ? 'border-red-400' : ''}">
        <Row justify={3}>
            {$t('auth.username')}
            {#if usernameError}
                <span class="text-red-400 text-xs normal-case">{$t(usernameError)}</span>
            {/if}
        </Row>
    </Input>
    <Input bind:value={passwordValue} labelClass="flex-col mb-6" class="mt-1 transition bg-transparent border-2 border-solid border-white/30 hover:border-white/40 focus:border-white/60 placeholder-gray-400 {passwordError ? 'border-red-400' : ''}">
        <Row justify={3}>
            {$t('auth.password')}
            {#if passwordError}
                <span class="text-red-400 text-xs normal-case">{$t(passwordError)}</span>
            {/if}
        </Row>
    </Input>
    {#if selectedUser > -1}
        <Button onClick={onLogin}>{$t('generic.login')}</Button>
        <Row>
            <Divider spacing="my-6 w-full" />
            <Row layout="mx-2">{$t('auth.or')}</Row>
            <Divider spacing="my-6 w-full" />
        </Row>
        <Button onClick={() => (selectedUser = -1)}>{$t('auth.create-user-new')}</Button>
    {:else}
        <Button onClick={onCreate}>{$t('generic.create')}</Button>
    {/if}
</Column>

{#if $users.length}
    <Column grow={0} layout="rounded-md bg-slate-700/20 w-64 fixed bottom-8 left-8">
        {#each $users as user, index (user.id)}
            {#if index !== 0}
                <Divider spacing="mx-0" />
            {/if}
            <button type="button" on:click={() => onUserClick(index)} class="user flex items-center px-3 py-2 {selectedUser === index ? 'bg-white/10' : ''}">
                <img src="/{index % 9}.jpg" alt="profile_placeholder" class="w-8 rounded-full mr-1" />
                <Row name="user-name" layout="tracking-wider ml-2">{user.name}</Row>
            </button>
        {/each}
    </Column>
{/if}