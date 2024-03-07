<script lang="ts">
    import { ImportWallets, Wallets } from '$lib/client';

    let compact: 0 | 1 = 0;
</script>

<Wallets {compact} />
<ImportWallets />