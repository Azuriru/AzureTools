<script lang="ts">
    import { ImportWallets, Wallets } from '$lib/client';

    let compact: 0 | 1 = 1;
</script>

<Wallets {compact} />
<ImportWallets />